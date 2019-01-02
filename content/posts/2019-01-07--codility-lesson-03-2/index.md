---
title: Lesson 3-2. Perm Missing Elem
subTitle: Codility Lessons ~ Time Complexity
category: "Algorithm"
cover: head.png
---

# 문제
An array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

Your goal is to find that missing element.

Write a function:

class Solution { public int solution(int[] A); }

that, given an array A, returns the value of the missing element.

For example, given array A such that:

    A[0] = 2
    A[1] = 3
    A[2] = 1
    A[3] = 5
the function should return 4, as it is the missing element.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [0..100,000];
* the elements of A are all distinct;
* each element of array A is an integer within the range [1..(N + 1)].

# 해결방안
* 등차수열을 통해 올바른 합을 구한다.
* 올바른 합계에서 배열 내부 값의 실제 합계를 빼서 누락된 값을 리턴한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {

    public int solution(int[] A) {

        long N = A.length + 1;
        long correctSum = (N * (N + 1)) / 2;
        
        long wrongSum = 0L;

        for (int i : A) {

            wrongSum += i;
        }

        return (int)(correctSum - wrongSum);
    }
}
```