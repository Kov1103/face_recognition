from tkinter import *
from tkinter import ttk
from tkinter import filedialog
from tkinter.filedialog import askopenfile
from PIL import Image, ImageTk
import os
import shutil
import tkinter.messagebox as mbox
from pymongo_get_database import get_database

dbName = get_database()
users = dbName["peoples"]
path = "dataset"

class Register_Window:
    def __init__(self, root):
        self.root = root
        self.root.title("Add new user")
        self.root.geometry("500x400")
        self.filename = ""

        register_lbl = Label(self.root, text="ADD NEW USER", font=("times new roman", 20, "bold"), fg="red").grid(row=0, column=0, columnspan=2, pady=20, padx=135)
        id_lbl = Label(self.root, text="ID", font=("times new roman", 15, "bold"), fg="black").grid(row=1, column=0, padx=10, pady=20)
        self.id_entry = Entry(self.root, width=40)
        self.id_entry.grid(row=1, column=1)
        name_lbl = Label(self.root, text="Name", font=("times new roman", 15, "bold"), fg="black").grid(row=2, column=0, padx=10, pady=20)
        self.name_entry = Entry(self.root, width=40)
        self.name_entry.grid(row=2, column=1)
        upload_lbl = Label(self.root, text="Upload Image", font=("times new roman", 15, "bold"), fg="black").grid(row=3, column=0, padx=10, pady=20)
        upload_btn = Button(self.root, text="Browse...", width=20, command= self.upload_file).grid(row=3, column=1)

        register_btn = Button(self.root, text="ADD", width=10, cursor="hand2", font=("times new roman", 15, "bold"), fg="red", command= self.add_new_user).grid(row=4, column=0, columnspan=2, pady=50)

    def upload_file(self):
        global img
        f_types = [('Jpg Files', '*.jpg'), ('PNG Files','*.png')]
        self.filename = filedialog.askopenfilename(filetypes=f_types)
        img = Image.open(self.filename)
        img_resized = img.resize((50, 50))
        img = ImageTk.PhotoImage(img_resized)
        btn = Button(self.root, image=img).grid(row=3, column=1)

    def add_new_user(self):
        if (self.id_entry.get() == "" or self.name_entry.get() == ""):
            mbox.showerror("Input Error", "Please fill in the blank input!")
        elif self.filename == "":
            mbox.showerror("Input Error", "Image missing!")
        else:
            filepath = path + "/" + self.name_entry.get()
            os.mkdir(filepath)
            shutil.copy(self.filename, filepath)

            new_obj = {"id_person": int(self.id_entry.get()), "name": self.name_entry.get(), "recog": 0}
            users.insert_one(new_obj)

            mbox.showinfo("Success", "New user has been added")

if __name__ == "__main__":
    root = Tk()
    app = Register_Window(root)
    root.mainloop()