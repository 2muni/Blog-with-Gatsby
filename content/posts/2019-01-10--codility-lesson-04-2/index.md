---
title: Lesson 4-2. Perm Check
subTitle: Codility Lessons ~ Counting Elements
category: "Algorithm"
cover: head.png
---

# 문제
A non-empty array A consisting of N integers is given.

A permutation is a sequence containing each element from 1 to N once, and only once.

For example, array A such that:

    A[0] = 4
    A[1] = 1
    A[2] = 3
    A[3] = 2
is a permutation, but array A such that:

    A[0] = 4
    A[1] = 1
    A[2] = 3
is not a permutation, because value 2 is missing.

The goal is to check whether array A is a permutation.

Write a function:

class Solution { public int solution(int[] A); }

that, given an array A, returns 1 if array A is a permutation and 0 if it is not.

For example, given array A such that:

    A[0] = 4
    A[1] = 1
    A[2] = 3
    A[3] = 2
the function should return 1.

Given array A such that:

    A[0] = 4
    A[1] = 1
    A[2] = 3
the function should return 0.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [1..100,000];
* each element of array A is an integer within the range [1..1,000,000,000].

# 해결방안
* 카운팅 배열을 생성하여 입력된 배열 원소값을 인덱스로 지정한다.
* 카운팅 배열의 논리 값 여부에 따라 결과값을 리턴한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8
        
        boolean[] bitmap = new boolean[A.length + 1];
        
        for(int i = 0; i < A.length; i++) {
            if(A[i] <= A.length) {
                bitmap[A[i]] = true;
            }
        }
        
        for(int i = 1; i < bitmap.length; i++) {
            if(!bitmap[i]) {
                return 0;
            }
        }
        
        return 1;
    }
}
```