from tkinter import *
from tkinter import ttk
from tkinter import filedialog
from tkinter.filedialog import askopenfile
import os
import shutil
import tkinter.messagebox as mbox
from pymongo_get_database import get_database

dbName = get_database()
users = dbName["peoples"]
path = "dataset"

class Delete_Window:
    def __init__(self, root):
        self.root = root
        self.root.title("Delete User")
        self.root.geometry("500x400")

        delete_lbl = Label(self.root, text="DELETE USER", font=("times new roman", 20, "bold"), fg="red").grid(row=0, column=0, columnspan=2, pady=20, padx=135)
        name_lbl = Label(self.root, text="Name", font=("times new roman", 15, "bold"), fg="black").grid(row=2, column=0, padx=10, pady=20)
        self.name_entry = Entry(self.root, width=40)
        self.name_entry.grid(row=2, column=1)

        delete_btn = Button(self.root, text="DELETE", width=10, cursor="hand2", font=("times new roman", 15, "bold"), fg="red", command= self.delete_user).grid(row=4, column=0, columnspan=2, pady=50)

    def delete_user(self):
        if (self.name_entry.get() == ""):
            mbox.showerror("Input Error", "Please fill in the blank input!")
        else:
            folderpath = os.getcwd() + "/dataset/" + self.name_entry.get()
            print(folderpath)
            if os.path.isdir(folderpath):
                shutil.rmtree(folderpath)
                users.delete_one({'name': self.name_entry.get()})
                mbox.showinfo("Success", "User {} has been deleted".format(self.name_entry.get()))
            else:
                mbox.showerror("Data Error", "The user is not exist in the database!")


if __name__ == "__main__":
    root = Tk()
    app = Delete_Window(root)
    root.mainloop()