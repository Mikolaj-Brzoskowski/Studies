def sort_i(t):
    copy_t = t[:]
    n=len(copy_t)
    j = n - 2
    while (j >= 0):
        p=copy_t[j]
        i=j+1
        while (i<n) and (p>copy_t[i]):
            copy_t[i-1]=copy_t[i]
            i=i+1
        copy_t[i-1]=p
        j=j-1
    print(copy_t)
    return copy_t

def test_sort_i():
    assert sort_i([3,6,8,4,7,2,9])==[2,3,4,6,7,8,9]
    assert sort_i([1,2,3,9,8,7])==[1,2,3,7,8,9]
    assert sort_i([7,8,3,6,1,4,3])==[1,3,3,4,6,7,8]
    assert sort_i([12,56,34,89,54,23,15])==[12,15,23,34,54,56,89]
    assert sort_i([4,7,9,1,2,5,8])==[1,2,4,5,7,8,9]
