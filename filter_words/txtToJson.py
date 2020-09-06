import json
import string
import re

filenames = ["stop_words_eng.txt", "DHS_words.txt"]
# filenames = ["stop_words_eng.txt"]

words = set()
exclude = set(string.punctuation)
for filename in filenames:
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            # line = ''.join(ch for ch in line if ch not in exclude)
            words_in_line = line.strip().split(",")[0].split(" ")
            for word in words_in_line:
                if len(word) != 0:
                    words.add(word.lower())

with open("bad_words.json") as json_file:
    bad_words = json.load(json_file)
    for word in bad_words["words"]:
        if "*" not in word:
            word = re.sub(
                u"([^\u4e00-\u9fa5\u0030-\u0039\u0041-\u005a\u0061-\u007a])", "", word)
            if len(word) != 0:
                words.add(word)

print(len(words))
dic = {}
dic["words"] = list(words)
print(len(dic["words"]))

with open("stop_words.json", "w") as f:
    json.dump(dic, f)

with open("stop_words.json") as f:
    read_dic = json.load(fp=f)
    print(len(read_dic["words"]))
