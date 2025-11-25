#include <stdio.h>
int main() {
    int n, key, i, found=0;
    printf("Enter number of elements: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for(i=0; i<n; i++) scanf("%d", &arr[i]);
    printf("Enter number to search: ");
    scanf("%d", &key);

    for(i=0; i<n; i++) {
        if(arr[i]==key) { printf("Found at position %d\n", i+1); found=1; break; }
    }
    if(!found) printf("Not found.\n");
    return 0;
}
