---
title: Lesson 5-3. Min Avg Two Slice
subTitle: Codility Lessons ~ Prefix sums
category: "Algorithm"
cover: head.png
---

# 문제
A non-empty array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P < Q < N, is called a slice of array A (notice that the slice contains at least two elements). The average of a slice (P, Q) is the sum of A[P] + A[P + 1] + ... + A[Q] divided by the length of the slice. To be precise, the average equals (A[P] + A[P + 1] + ... + A[Q]) / (Q − P + 1).

For example, array A such that:

    A[0] = 4
    A[1] = 2
    A[2] = 2
    A[3] = 5
    A[4] = 1
    A[5] = 5
    A[6] = 8
contains the following example slices:

* slice (1, 2), whose average is (2 + 2) / 2 = 2;
* slice (3, 4), whose average is (5 + 1) / 2 = 3;
* slice (1, 4), whose average is (2 + 2 + 5 + 1) / 4 = 2.5.
The goal is to find the starting position of a slice whose average is minimal.

Write a function:

class Solution { public int solution(int[] A); }

that, given a non-empty array A consisting of N integers, returns the starting position of the slice with the minimal average. If there is more than one slice with a minimal average, you should return the smallest starting position of such a slice.

For example, given array A such that:

    A[0] = 4
    A[1] = 2
    A[2] = 2
    A[3] = 5
    A[4] = 1
    A[5] = 5
    A[6] = 8
the function should return 1, as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [2..100,000];
* each element of array A is an integer within the range [−10,000..10,000].

# 해결방안
* 두 수의 평균 값은 작은 수의 이상값이 되며, 그룹간의 비교에도 전체의 평균 값은 각 그룹 중 평균 중 작은 값 이상이 된다.
* 그러므로 가능한 부분순열의 평균의 최소값은 작은 수의 그룹 평균의 최소값이다.
* 최소 그룹의 인자 수는 2개일 경우와 3개일 경우가 존재한다.

# 소스코드(Java)
```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8
        
        double minAvg = (A[0] + A[1]) / 2.0;
        int result = 0;
        
        for(int i = 2; i < A.length; i++) {
            double avg = (A[i-2] + A[i-1] + A[i]) / 3.0;
            if(avg < minAvg) {
                minAvg = avg;
                result = i-2;
            }
            
            avg = (A[i-1] + A[i]) / 2.0;
            if(avg < minAvg) {
                minAvg = avg;
                result = i-1;
            }
        }
        
        return result;
    }
}
```