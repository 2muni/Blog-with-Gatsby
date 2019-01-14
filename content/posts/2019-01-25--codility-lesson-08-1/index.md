---
title: Lesson 8-1. Dominator
subTitle: Codility Lessons ~ Leader
category: "Algorithm"
cover: head.png
---

# 문제
An array A consisting of N integers is given. The dominator of array A is the value that occurs in more than half of the elements of A.

For example, consider array A such that

    A[0] = 3    A[1] = 4    A[2] =  3
    A[3] = 2    A[4] = 3    A[5] = -1
    A[6] = 3    A[7] = 3
The dominator of A is 3 because it occurs in 5 out of 8 elements of A (namely in those with indices 0, 2, 4, 6 and 7) and 5 is more than a half of 8.

Write a function

class Solution { public int solution(int[] A); }

that, given an array A consisting of N integers, returns index of any element of array A in which the dominator of A occurs. The function should return −1 if array A does not have a dominator.

For example, given array A such that

    A[0] = 3    A[1] = 4    A[2] =  3
    A[3] = 2    A[4] = 3    A[5] = -1
    A[6] = 3    A[7] = 3
the function may return 0, 2, 4, 6 or 7, as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [0..100,000];
* each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

# 해결방안
* HashMap을 통해 입력 배열의 값과 해당 값이 등장한 횟수를 저장한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8
        
        int count = 0;
        int maxCount = 0;
        int result = -1;
        
        HashMap<Integer, Integer> bitmap = new HashMap<Integer, Integer>();
        
        for(int i = 0; i < A.length; i++) {
            count = (bitmap.get(A[i]) == null) ? 1 : bitmap.get(A[i]) + 1;
            bitmap.put(A[i], count);
            
            if(maxCount < count) {
                maxCount = count;
                result = i;
            }else if(maxCount == count){
                result = -1;
            }
        }
        
        if(A.length/2 < maxCount) return result;
        else return -1;
    }
}
```