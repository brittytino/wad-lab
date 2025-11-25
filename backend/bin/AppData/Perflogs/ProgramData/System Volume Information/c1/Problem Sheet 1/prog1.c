#include <stdio.h>
int main() {
    int x;
    float numerator, denominator, f;
    printf("Enter value of x: ");
    scanf("%d", &x);

    numerator = (x*x*x) - (2*x*x) + x - 6.3;
    denominator = (x*x*x) + (0.05*x) + 3.14;
    f = numerator / denominator;

    printf("Result = %f\n", f);
    return 0;
}
