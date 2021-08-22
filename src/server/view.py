import pathlib
import os
import sys

folder = '../uploads'
dir_names=[]
dir_paths=[]

def get_files():   
    for content in os.scandir(folder):
        if content.is_dir():
            dir_names.append(os.path.basename(content.path))
            dir_paths.append(content.path)
    
    for dir in dir_names:
        print(dir)


def return_path(filename):
    for content in os.scandir(folder):
        if content.is_dir() and os.path.basename(content.path) == filename:
            print(content.path)


arg = sys.argv[1]
if arg == "":
    get_files()
else:
    return_paths(arg)


# get_files()


