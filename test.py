def make_list(number):
    names=[]
    for item in number:
        names.append(input("Enter name: "))
    print (names)

number = int(input("Enter number of names: "))
names = make_list(number)
for name in names:
    if name [1] == "A":
        print ("Name", name, "starts with A")
