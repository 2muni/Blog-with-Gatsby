---
title: Lesson 7-1. Brackets
subTitle: Codility Lessons ~ Stacks and Queues
category: "Algorithm"
cover: head.png
---

# 문제
A string S consisting of N characters is considered to be properly nested if any of the following conditions is true:

* S is empty;
* S has the form "(U)" or "[U]" or "{U}" where U is a properly nested string;
* S has the form "VW" where V and W are properly nested strings.
For example, the string "{[()()]}" is properly nested but "([)()]" is not.

Write a function:

class Solution { public int solution(String S); }

that, given a string S consisting of N characters, returns 1 if S is properly nested and 0 otherwise.

For example, given S = "{[()()]}", the function should return 1 and given S = "([)()]", the function should return 0, as explained above.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range [0..200,000];
* string S consists only of the following characters: "(", "{", "[", "]", "}" and/or ")".

# 해결방안
* 스택 구조를 통해 bracket의 열림, 닫힘 여부를 판단한다.
* 동일 유형의 bracket 입력에 유의.

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
        
        int result = 0;
        
        for(int i = 0; i < S.length(); i++) {
            if(S.charAt(i) == '(' || S.charAt(i) == '{' || S.charAt(i) == '[')
                stack.push(S.charAt(i));
            else {
                if(stack.empty()) return result;
                
                char lastChar = stack.pop();
                
                if(lastChar == '(' && S.charAt(i) != ')') return result;
                else if(lastChar == '{' && S.charAt(i) != '}') return result;
                else if(lastChar == '[' && S.charAt(i) != ']') return result;
            }
        }
        
        if(!stack.empty()) return result;
        
        result = 1;
        
        return result;
    }
}
```