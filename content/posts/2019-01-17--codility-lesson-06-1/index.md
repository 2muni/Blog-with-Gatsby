---
title: Lesson 6-1. Distinct
subTitle: Codility Lessons ~ Sorting
category: "Algorithm"
cover: head.png
---

# 문제
Write a function

class Solution { public int solution(int[] A); }

that, given an array A consisting of N integers, returns the number of distinct values in array A.

For example, given array A consisting of six elements such that:

    A[0] = 2    A[1] = 1    A[2] = 1
    A[3] = 2    A[4] = 3    A[5] = 1
the function should return 3, because there are 3 distinct values appearing in array A, namely 1, 2 and 3.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [0..100,000];
* each element of array A is an integer within the range [−1,000,000..1,000,000].

# 해결방안
* 정렬 된 배열 내부의 이전 원소 값과 현 원소 값을 비교한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8
        
        Arrays.sort(A);
        
        int result = 0;
        
        if(A.length > 0) result = 1;
        
        for(int i = 1; i < A.length; i++) {
            if(A[i - 1] != A[i]) result++;
        }
        
        return result;
    }
}
```