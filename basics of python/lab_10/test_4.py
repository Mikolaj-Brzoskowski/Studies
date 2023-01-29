def sort_i(t):
    copy_t = t[:]
    n=len(copy_t)
    j = n - 2
    while (j >= 0):
        p=copy_t[j]
        i=j+1
        while (i<n) and (p<copy_t[i]):
            copy_t[i-1]=copy_t[i]
            i=i+1
        copy_t[i-1]=p
        j=j-1
    print(copy_t)
    return copy_t

def test_sort_i():
    assert sort_i([3,6,8,4,7,2,9])==[9,8,7,6,4,3,2]
    assert sort_i([1,2,3,9,8,7])==[9,8,7,3,2,1]
    assert sort_i([7,8,3,6,1,4,3])==[8,7,6,4,3,3,1]
    assert sort_i([12,56,34,89,54,23,15])==[89,56,54,34,23,15,12]
    assert sort_i([4,7,9,1,2,5,8])==[9,8,7,5,4,2,1]