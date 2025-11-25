#include <stdio.h>
int main() {
    int n, i, pos=0, neg=0, even=0, odd=0;
    printf("Enter number of elements: ");
    scanf("%d", &n);
    int arr[n];

    printf("Enter elements: ");
    for(i=0; i<n; i++) {
        scanf("%d", &arr[i]);
        if(arr[i]>=0) pos++; else neg++;
        if(arr[i]%2==0) even++; else odd++;
    }
    printf("Positive: %d\nNegative: %d\nEven: %d\nOdd: %d\n", pos, neg, even, odd);
    return 0;
}
