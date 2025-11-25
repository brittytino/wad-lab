#include <stdio.h>
int main() {
    int x, temp, rev, digit;
    printf("Enter number: ");
    scanf("%d", &x);

    while(1){
        x++;
        temp = x;
        rev = 0;
        while(temp>0){
            digit = temp%10;
            rev = rev*10 + digit;
            temp/=10;
        }
        if(rev==x){
            printf("Next palindrome: %d\n", x);
            break;
        }
    }
    return 0;
}
