import os;
import platform;

def main():
  if (platform.platform().lower().find("windows") == -1):
    os.system("cp *.html ./public")
    #os.system("cp *.jpg ./public")
    #os.system("cp *.png ./public")
    os.system("cp ./style/*.css ./public")
    os.system("cp -rf ./images ./public")
    os.system("cp *.js ./public");
    os.system("firebase deploy")
    
  else:
    os.system("copy *.html public")
    #os.system("copy *.jpg public")
    #os.system("copy *.png public")
    os.system("copy style public\style")
    os.system("copy images public\images")
    os.system("copy *.js public");
    os.system("firebase deploy")

if __name__=='__main__':
  main()
