#include <stdio.h>

int main() {
    int n, i, max, min;
    float sum = 0, avg;
    int arr[50];

    printf("Enter number of days: ");
    scanf("%d", &n);
    printf("Enter attendance for %d days: ", n);
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);

    max = min = arr[0];
    for (i = 0; i < n; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
        sum += arr[i];
    }
    avg = sum / n;

    printf("\nMaximum Attendance: %d\nMinimum Attendance: %d\nAverage Attendance: %.2f\n",
           max, min, avg);
    return 0;
}
