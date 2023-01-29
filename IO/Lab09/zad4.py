import pandas as pd
import snscrape.modules.twitter as sntwitter
import itertools

tweets_list = []


# our search term, using syntax for Twitter's Advanced Search
search = '"Mona Lisa"'

# the scraped tweets, this is a generator
scraped_tweets = sntwitter.TwitterSearchScraper('Mona Lisa', top=True).get_items()

# slicing the generator to keep only the first 100 tweets
sliced_scraped_tweets = itertools.islice(scraped_tweets, 1000)

# convert to a DataFrame and keep only relevant columns
df = pd.DataFrame(sliced_scraped_tweets)[['date', 'content']]

print(df)