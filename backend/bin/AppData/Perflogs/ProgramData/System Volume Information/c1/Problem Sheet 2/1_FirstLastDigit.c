#include <stdio.h>

int main() {
    int n, first, last;
    printf("Enter a positive integer: ");
    if (scanf("%d", &n) != 1 || n <= 0) {
        printf("Invalid input\n");
        return 0;
    }

    last = n % 10;
    while (n >= 10)
        n /= 10;
    first = n;

    if (first % last == 0 || last % first == 0)
        printf("One digit is a multiple of the other\n");
    else
        printf("Digits are not multiples of each other\n");

    return 0;
}
