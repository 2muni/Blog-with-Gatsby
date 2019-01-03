---
title: Lesson 4-3. Missing Integer
subTitle: Codility Lessons ~ Counting Elements
category: "Algorithm"
cover: head.png
---

# 문제
This is a demo task.

Write a function:

class Solution { public int solution(int[] A); }

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [1..100,000];
* each element of array A is an integer within the range [−1,000,000..1,000,000].

# 해결방안
* 카운팅 배열을 생성하여 입력된 배열 원소값을 인덱스로 지정한다.
* 입력된 배열에 대하여 순열 여부에 따라 리턴값을 달리한다.

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
            if(A[i] > 0 && A[i] < bitmap.length) bitmap[A[i]] = true;
        }
        
        for(int i = 1; i < bitmap.length; i++) {
            if(!bitmap[i]) return i;
        }
        
        return bitmap.length;
    }
}
```