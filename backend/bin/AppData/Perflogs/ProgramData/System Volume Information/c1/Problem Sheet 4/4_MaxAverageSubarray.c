#include <stdio.h>

int main() {
    int n, k, i, startIndex = 0;
    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];
    printf("Enter %d elements:\n", n);
    for (i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    printf("Enter length of subarray (k): ");
    scanf("%d", &k);

    int sum = 0;
    for (i = 0; i < k; i++)
        sum += arr[i];

    int maxSum = sum;
    for (i = k; i < n; i++) {
        sum = sum + arr[i] - arr[i - k];
        if (sum > maxSum) {
            maxSum = sum;
            startIndex = i - k + 1;
        }
    }

    float avg = (float)maxSum / k;
    printf("\nMaximum average subarray of length %d begins at index %d\n", k, startIndex);
    printf("Maximum average = %.2f\n", avg);

    return 0;
}
