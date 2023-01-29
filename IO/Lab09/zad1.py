import nltk
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
import matplotlib.pyplot as plt
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.stem.porter import PorterStemmer

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

text="""The US will send Ukraine more advanced rocket systems to help it defend itself, President Biden has announced.

The weapons, long requested by Ukraine, are to help it strike enemy forces more precisely from a longer distance.

Until now, the US had refused the request out of fear the weapons could be used against targets in Russia.

Moscow said it viewed the latest US weapons package to Ukraine including the new systems "extremely negatively".

Separately, the German government has promised to send an air defence system to Ukraine.

Chancellor Olaf Scholz told MPs that the IRIS-T system was the most modern Germany possessed and would enable Ukraine to defend an entire city against Russian air attacks.

He added that he would provide tracking radar capable of detecting enemy artillery, and multiple rocket launchers.

Balancing act
On Wednesday, Mr Biden said the lethal aid would strengthen Kyiv's negotiating position against Russia and make a diplomatic solution more likely.

Writing in the New York Times, he said: "That is why I've decided that we will provide the Ukrainians with more advanced rocket systems and munitions that will enable them to more precisely strike key targets on the battlefield in Ukraine."

This is a fine balancing act for Mr Biden, as providing more powerful weapons could provoke a reaction from Russia, risking direct conflict between the US and its Nato allies and Moscow.

New weaponry will include the M142 High Mobility Artillery Rocket System (HIMARS), a senior White House official said - although he did not specify how many of them would be supplied.

The systems can launch multiple precision-guided missiles at targets as far as 70km (45 miles) away - far further than the artillery that Ukraine currently has. They are also believed to be more accurate than their Russian equivalents.

Last month, Ukraine's army chief said that getting the HIMARS units would be "crucial" in allowing it to counter Russian missile attacks.

The US expects Ukraine to deploy the weapons in the eastern Donbas region, where the fighting is most intense, and where they can be used to strike Russian artillery units and forces targeting Ukrainian towns.

White House officials agreed to provide the rockets, they said, only after gaining assurances from President Volodomyr Zelensky that the weapons would not be used to attack targets inside Russia.

"We are not going to send to Ukraine rocket systems that can strike into Russia," Mr Biden wrote on Wednesday.

Mr Zelensky confirmed this in an interview for US network Newsmax.

"We're not interested in what is happening in Russia," he said. "We're only interested in our own territory in Ukraine."

But Russian Deputy Foreign Minister Sergei Ryabkov did not appear to accept these limitations.

"We view this extremely negatively, because attempts to present the decision as containing elements of 'self-restraint' are useless," he said, quoted by Ria news agency.

"It is obvious that the US, at the head of a group of countries, is pumping weapons directly to the Kyiv regime. And the juggling and manipulation of some particular aspects of what is happening do not change the overall picture for us."

The latest rockets will be the centrepiece of a $700m (£556m) support package for Ukraine that will be formally unveiled on Wednesday, White House officials said.

Helicopters, anti-tank weapons, tactical vehicles and spare parts are to be included in what will be the 11th package of military aid approved by the US for Ukraine since the invasion began in February.

In Wednesday's article, Mr Biden wrote that the US's goal was simply to see a "democratic, independent, sovereign" Ukraine, not to oust Mr Putin from his role as Russian president or to seek broader conflict with Moscow.

He blamed Russia's continued aggression for the stalling of peace efforts, adding that the US would never put pressure on Ukraine to concede any of its territory in return for an end to the conflict.

Directly addressing the risk of nuclear weapons being used in Ukraine, Mr Biden said "we currently see no indication" of this being Russia's intention - but warned that doing so would be unacceptable and bring with it "severe consequences".

Soon after Mr Biden's piece was published, Russian military officials announced that the country's nuclear forces were holding drills in Ivanovo province near Moscow, Interfax news agency reported.
"""

rick_roll="""We're no strangers to love
You know the rules and so do I (do I)
A full commitment's what I'm thinking of
You wouldn't get this from any other guy
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it (say it)
Inside, we both know what's been going on (going on)
We know the game and we're gonna play it
And if you ask me how I'm feeling
Don't tell me you're too blind to see
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it (to say it)
Inside, we both know what's been going on (going on)
We know the game and we're gonna play it
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you"""

tokenized_text=sent_tokenize(text)
print(tokenized_text)
tokenized_word=word_tokenize(text)
print(len(tokenized_word))

new_stopwords = ["I", "!", ",", "m", "'m", "n't", ".", "'", "'s", "``", "''", "Mr", "The", "-"]

stop_words=nltk.corpus.stopwords.words('english')
stop_words.extend(new_stopwords)
filtered_sent=[]
for w in tokenized_word:
    if w not in stop_words:
        filtered_sent.append(w)
print("Filterd Sentence:",filtered_sent)

wl = WordNetLemmatizer()

lemmed_words=[]
for w in filtered_sent:
    lemmed_words.append(wl.lemmatize(w, "v"))

print(lemmed_words)

fdist = FreqDist(lemmed_words)
print(fdist.most_common(10))

fdist.plot(10,cumulative=False)
plt.show()