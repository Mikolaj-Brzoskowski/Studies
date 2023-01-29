import nltk
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
import matplotlib.pyplot as plt
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.stem.porter import PorterStemmer
from nltk.sentiment import SentimentIntensityAnalyzer
import text2emotion as te
import json

script = """"""
names = []

with open('Inteligencja Obliczeniowa\Projekt2\script.json') as json_file:
    script_dict = json.load(json_file)

    
script_no_names=[]

with open('Inteligencja Obliczeniowa\Projekt2\Hamilton.txt') as f:
    script = f.read()

tokenized_text=sent_tokenize(script)
tokenized_word=word_tokenize(script)
stop_words=nltk.corpus.stopwords.words('english')
new_stopwords = ["I","We", "He","DEEP", "It", "A-L-E-X-A-N-D", "I—", "P.", "ALL", "MORE", "TWO", "N.Y.C",
                 "LAF", "C", "She", "They", "da", "!", ",", "m", "'m", "n't", ".", "'", "'s", "``", "''", 
                 "Mr", "The", "-", "’", "?", "(", ")", "‘", ":", "&", "”", "“", "And", "You", "A", "FULL",
                 "AND", "EXCEPT", "ANOTHER", "EVEN", "ALL", "MALE", "FEMALE", "SCHUYLER", "BOTH"]
stop_words.extend(new_stopwords)
filtered_word=[]
for w in tokenized_word:
    if w not in stop_words:
        filtered_word.append(w)

for word in filtered_word:
    if word.isupper():
        for splitted in word.split("/"):
            names.append(splitted)
    else:
        script_no_names.append(word)
names = list(set(names))

fdist = FreqDist(script_no_names)
print(fdist.most_common(10))

fdist.plot(10,cumulative=False)
plt.show()

lem = WordNetLemmatizer()

lemmed_words=[]
for w in filtered_word:
    lemmed_words.append(lem.lemmatize(w))
    
#create dict for persons
# for name in names:
#     script_dict[name] = []
#     add = False
#     for word in lemmed_words:
#         if word.isupper():
#             if name in word:
#                 add = True
#             else:
#                 add = False
#         elif add == True:
#             script_dict[name].append(word)
            
#ocena emocji
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()
for key in script_dict:
    name_neg = 0
    name_neu = 0
    name_pos = 0
    name_comp = 0
    name_angry = 0
    name_fear = 0
    name_happy = 0
    name_sad = 0
    name_surprise = 0
    words_with_emotion_count = 0
    for word in script_dict[key]:
        #zliczanie negatywnych / pozytywnych emocji
        name_pos += sia.polarity_scores(word)["pos"]
        name_neu += sia.polarity_scores(word)["neu"]
        name_neg += sia.polarity_scores(word)["neg"]
        name_comp += sia.polarity_scores(word)["compound"]
        #zliczanie kontretnych uczuć
        if te.get_emotion(word)["Angry"] != 0 or te.get_emotion(word)["Fear"] != 0 or te.get_emotion(word)["Happy"] != 0 or te.get_emotion(word)["Sad"] != 0 or te.get_emotion(word)["Surprise"] != 0:
            name_angry += te.get_emotion(word)["Angry"]
            name_fear += te.get_emotion(word)["Fear"]
            name_happy += te.get_emotion(word)["Happy"]
            name_sad += te.get_emotion(word)["Sad"]
            name_surprise += te.get_emotion(word)["Surprise"]
            words_with_emotion_count += 1
    word_count = len(script_dict[key])
    #emocje
    average_neg = name_neg / word_count
    average_neu = name_neu / word_count
    average_pos = name_pos / word_count
    average_comp = name_comp / word_count
    #uczucia
    average_angry = name_angry / words_with_emotion_count
    average_fear = name_fear / words_with_emotion_count
    average_happy = name_happy / words_with_emotion_count
    average_sad = name_sad / words_with_emotion_count
    average_surprise = name_surprise / words_with_emotion_count
    print("Average neg/pos scores for " + key + ", neg: " + str(average_neg) + ", neu: " + 
          str(average_neu) + ", pos: " + str(average_pos) + ", compound: " + str(average_comp))
    print("Average emotion scores for " + key + ", angry: " + str(average_angry) + ", fear: " + 
          str(average_fear) + ", happy: " + str(average_happy) + ", sad: " + str(average_sad) + ", surprise: " + str(average_surprise))