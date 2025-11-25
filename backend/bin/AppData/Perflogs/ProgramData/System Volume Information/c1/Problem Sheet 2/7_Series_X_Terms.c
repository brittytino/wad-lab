#include <stdio.h>

int main() {
    int X, n, term = 0, sum = 0;
    printf("Enter X and n: ");
    scanf("%d %d", &X, &n);

    for (int i = 1; i <= n; i++) {
        term = term * 10 + X;  // build number like X, XX, XXX
        sum += term;
    }
    printf("Sum = %d\n", sum);

    return 0;
}
