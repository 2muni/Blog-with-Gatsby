---
title: Lesson 6-3. Triangle
subTitle: Codility Lessons ~ Sorting
category: "Algorithm"
cover: head.png
---

# 문제
An array A consisting of N integers is given. A triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:

* A[P] + A[Q] > A[R],
* A[Q] + A[R] > A[P],
* A[R] + A[P] > A[Q].
For example, consider array A such that:

    A[0] = 10    A[1] = 2    A[2] = 5
    A[3] = 1     A[4] = 8    A[5] = 20
Triplet (0, 2, 4) is triangular.

Write a function:

class Solution { public int solution(int[] A); }

that, given an array A consisting of N integers, returns 1 if there exists a triangular triplet for this array and returns 0 otherwise.

For example, given array A such that:

    A[0] = 10    A[1] = 2    A[2] = 5
    A[3] = 1     A[4] = 8    A[5] = 20
the function should return 1, as explained above. Given array A such that:

    A[0] = 10    A[1] = 50    A[2] = 5
    A[3] = 1
the function should return 0.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [0..100,000];
* each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

# 해결방안
* 정렬 된 배열에서, 인접한 3개의 원소 값을 비교한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8
        
        if(A.length >= 3) Arrays.sort(A);
        else return 0;
        
        int result = 0;
        
        for(int i = 2; i < A.length; i++) {
            long side = A[i];
            long diff = (long)A[i - 2] + (long)A[i - 1];
            
            if(diff > side) result = 1;
        }
        
        return result;
    }
}
```