---
title: Lesson 7-3. Nesting
subTitle: Codility Lessons ~ Stacks and Queues
category: "Algorithm"
cover: head.png
---

# 문제
A string S consisting of N characters is called properly nested if:

* S is empty;
* S has the form "(U)" where U is a properly nested string;
* S has the form "VW" where V and W are properly nested strings.
For example, string "(()(())())" is properly nested but string "())" isn't.

Write a function:

class Solution { public int solution(String S); }

that, given a string S consisting of N characters, returns 1 if string S is properly nested and 0 otherwise.

For example, given S = "(()(())())", the function should return 1 and given S = "())", the function should return 0, as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [0..1,000,000];
* string S consists only of the characters "(" and/or ")".

# 해결방안
* 입력 String의 올바른 유형이 "(U)"임을 주의

# 소스코드(Java)
```java
// you can also use imports, for example:
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(String S) {
        // write your code in Java SE 8
        
        Stack<Character> stack = new Stack<Character>();
        
        for(int i = 0; i < S.length(); i++) {
            if(stack.empty()) {
                stack.push(S.charAt(i));
            }else if(stack.peek() == '(') {
                if(stack.peek() != S.charAt(i)) stack.pop();
                else stack.push(S.charAt(i));
            }else return 0;
        }
        
        if(stack.empty()) return 1;
        else return 0;
    }
}
```