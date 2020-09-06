import json

filenames = ["stop_words_eng.txt", "DHS_words.txt"]

words = []
for filename in filenames:
    with open(filename) as f:
        for line in f:
            words_in_line = line.strip().split(",")[0].split(" ")
            for word in words_in_line:
                words.append(word.lower())

with open("bad_words.json") as json_file:
    bad_words = json.load(json_file)
    new_words = list(set(words + bad_words["words"]))

print(len(new_words))
dict = {}
dict["words"] = new_words

outfile = open("stop_words.json", "w")
json.dump(dict, outfile)
outfile.close()
