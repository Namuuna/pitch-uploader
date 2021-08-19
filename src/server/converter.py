from pdf2image import convert_from_path
import pathlib
import os
import sys

class Converter:
    def __init__(self, filename) -> None:
        self.filename = filename
        self.name = None
        self.type = None
        self.folder = '../../uploads'

    def get_file_type(self):
        name, type = os.path.splitext(self.filename)
        self.type = type
        self.name = name
        self.create_folder()

    def create_folder(self):
        path = os.path.join(self.folder, self.name)
        try:
            os.mkdir(path)
        except OSError as error:
            print(error)

    def convert_from_pdf(self):
        current_dir = pathlib.Path("").parent.resolve()
        pdf2_convert = os.path.join(self.folder, self.filename)
        poppler_path = os.path.join(current_dir, "poppler-0.68.0_x86", "bin")

        files=[]
        try:
            images = convert_from_path(pdf_path=pdf2_convert,poppler_path=poppler_path)
            for i in range(len(images)):
                images[i].save(str(i) +'.jpg', 'JPEG')
                files.append(str(i)+'.jpg')

        except():
            print("No pdf")
        else:
            print("Converted")

        self.move_images(current_dir,files)


    def move_images(self, current_dir, files):
        output_dir = os.path.join(self.folder,self.name)

        for i in files:
            os.rename(os.path.join(current_dir,i),os.path.join(output_dir,i))

    def removeFile(self):
        pass


converter = Converter(sys.argv[1])
converter.get_file_type()
converter.convert_from_pdf()





