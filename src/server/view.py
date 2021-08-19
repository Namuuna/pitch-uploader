import pathlib
import os
import sys

folder = '../../uploads'

def get_files():
    dir_names=[]
    dir_paths=[]
    for content in os.scandir(folder):
        if content.is_dir():
            dir_names.append(os.path.basename(content.path))
            dir_paths.append(content.path)
    
    for dir in dir_names:
        print(dir)
    # print(dir_names)
    # print(dir_paths)


def view_file():
    pass
    

arg = sys.argv[1]
if arg == 'query':
    get_files()
else:
    view_file()


# get_files()


