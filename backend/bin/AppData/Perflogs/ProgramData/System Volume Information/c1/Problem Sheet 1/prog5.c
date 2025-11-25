#include <stdio.h>
#include <stdlib.h>
int main() {
    int a, b, biggest;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    biggest = (a + b + abs(a - b)) / 2;
    printf("Biggest = %d\n", biggest);
    return 0;
}
