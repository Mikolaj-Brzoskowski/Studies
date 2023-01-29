nltk.download('vader_lexicon')

from nltk.sentiment.vader import SentimentIntensityAnalyzer

positive = """We had a Queen size double bed which was on the sixth floor with our own private bathroom with free wifi and we also got breakfast in the morning which was included in the stay.
We had a choice of continental or cooked breakfast. The bathroom was very nice with a high powered shower.
There was a small office table and chair if you need to use your iPad or your laptop to do some work or just look at where you need to travel too if you want to get to any of the tourist attractions.
There was a kettle and a small iron and iron board in the room if you need to iron your clothes.
There was coat hangers and a safe box should you need to put away important documents and cash that you don’t want to get lost."""


negative=""" Never have I entered a room and wanted to run and cry like when we arrived here. We understand that you don't pay for orange juice and expect champagne but there are limits. This hotel is in a ghetto area and is awful it had hardboard in the windows at the back of the room, had no storage facilities and is in the middle of a disco area so you get two types of music coming at you to around 0400. We only stayed one night due to getting there so late we couldn't find other accommodation"""

analyzer = SentimentIntensityAnalyzer()
score = analyzer.polarity_scores(positive)
print(score)