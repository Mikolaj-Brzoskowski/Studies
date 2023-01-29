import pandas as pd
import numpy as np

# Read csv file into a pandas dataframe
missing_values = ["NA", "-"]
df = pd.read_csv("IO\Lab06\iris_with_errors.csv", na_values = missing_values)
print(df.isnull().sum())

cnt=0
for row in df['sepal.length']:
    if row in range(0, 16):
        pass
    else:
        median = df['sepal.length'].median()
        df.loc[cnt, 'sepal.length']=median
    cnt += 1

cnt=0
for row in df['sepal.width']:
    if row in range(0, 16):
        pass
    else:
        median = df['sepal.width'].median()
        df.loc[cnt, 'sepal.width']=median
    cnt += 1
    
cnt=0
for row in df['petal.length']:
    if row in range(0, 16):
        pass
    else:
        median = df['petal.length'].median()
        df.loc[cnt, 'petal.length']=median
    cnt += 1
    
cnt=0
for row in df['petal.width']:
    if row in range(0, 16):
        pass
    else:
        median = df['petal.width'].median()
        df.loc[cnt, 'petal.width']=median
    cnt += 1
    
cnt=0
for row in df['variety']:
    if cnt in range(0, 50):
        df.loc[cnt, 'variety']="Setosa"
    if cnt in range(50, 100):
        df.loc[cnt, 'variety']="Versicolor"
    if cnt in range(100, 150):
        df.loc[cnt, 'variety']="Virginica"
    cnt += 1
    
df.to_csv("IO\Lab06\iris_fixed.csv")