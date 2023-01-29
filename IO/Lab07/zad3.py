from sklearn import tree
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv("IO\Lab07\iris.csv")

(train_set, test_set) = train_test_split(df.values, train_size=0.7, random_state=274965)

train_inputs = train_set[:, 0:4]
train_classes = train_set[:, 4]
test_inputs=test_set[:, 0:4]
test_classes = test_set[:, 4]

dtc = tree.DecisionTreeClassifier()
dtc.fit(train_inputs, train_classes)
score = dtc.score(test_inputs, test_classes)
print(score)