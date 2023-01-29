def sort_b(t):
    copy_t = t[:]
    j = len(copy_t) - 1
    while (j >= 1):
        i=0
        while (i < j):
            if copy_t[i] < copy_t[i+1]:
                copy_t[i],copy_t[i+1]=copy_t[i+1],copy_t[i]
            i=i+1
        j=j-1
    print(copy_t)
    return copy_t

def test_sort_b():
    assert sort_b([3,6,8,4,7,2,9])==[9,8,7,6,4,3,2]
    assert sort_b([1,2,3,9,8,7])==[9,8,7,3,2,1]
    assert sort_b([7,8,3,6,1,4,3])==[8,7,6,4,3,3,1]
    assert sort_b([12,56,34,89,54,23,15])==[89,56,54,34,23,15,12]
    assert sort_b([4,7,9,1,2,5,8])==[9,8,7,5,4,2,1]
