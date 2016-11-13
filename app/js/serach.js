//
// Calculate the Edit Distance between two strings
// Reference: https://en.wikipedia.org/wiki/Edit_distance
// Instead of using a 2D matrix, this implemention use a 1D array to iterate a.length+1 times
// This will save space, hence, save the space allocation time.
//
function editDistance(a, b)
{
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    var iter_len = b.length + 1;
    var iter_arr = new Array(iter_len);
    var iter_arr_tmp = new Array(iter_len);
    for(let i=0; i<iter_arr.length; ++i)    //initialize the iter_arr
        iter_arr[i] = i;
    
    var tmp = null;
    for(let i =1; i<=a.length; ++i)
    {
        iter_arr_tmp[0] = i;
        for(let j=1; j<=b.length; ++j)
        {
            if(a.charAt(i-1) == b.charAt(j-1))
                iter_arr_tmp[j] = iter_arr[j-1];
            else {
                iter_arr_tmp[j] = Math.min(iter_arr[j-1]+1, Math.min(iter_arr_tmp[j-1]+1, iter_arr[j]+1));
            }
        }
        tmp = iter_arr_tmp;
        iter_arr_tmp = iter_arr;
        iter_arr = tmp;
    }
    return iter_arr[b.length];
}