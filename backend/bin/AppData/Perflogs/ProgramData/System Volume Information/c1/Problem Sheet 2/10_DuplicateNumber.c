#include <stdio.h>

int main() {
    int N;
    printf("Enter N: ");
    scanf("%d", &N);

    int arr[N];
    printf("Enter %d numbers (1 to N with one duplicate):\n", N);
    for (int i = 0; i < N; i++)
        scanf("%d", &arr[i]);

    int expectedSum = N * (N + 1) / 2;
    int actualSum = 0;
    for (int i = 0; i < N; i++)
        actualSum += arr[i];

    int duplicate = actualSum - expectedSum;
    printf("Duplicate number is %d\n", duplicate);

    return 0;
}
