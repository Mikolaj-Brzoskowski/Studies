def flatten(L):
    if L == [[]]:
        return []
    elif L[-1] == []:
        return flatten(L[:-1])
    else:
        k = L[-1][-1]
    L[-1].pop(-1)
    return flatten(L) + [k]

def test_lista():
    assert flatten([[1,2,3],[4,5],[6]]) == [1,2,3,4,5,6]
    assert flatten([[1,2,3],[4,5,6],[7]]) == [1,2,3,4,5,6,7]
    assert flatten([[1,2,3],[7]]) == [1,2,3,7]
    assert flatten([[10,23,30],[41,53,64]]) == [10,23,30,41,53,64]
    assert flatten([[1,2,3],[4,5,6],[7],[8],[9,10]]) == [1,2,3,4,5,6,7,8,9,10]

