#include <stdio.h>
int main() {
    int n,i,j;
    printf("Enter number of elements: ");
    scanf("%d",&n);
    int arr[n];

    printf("Enter elements: ");
    for(i=0;i<n;i++) scanf("%d",&arr[i]);

    for(i=0;i<n;i++)
        for(j=i+1;j<n;j++)
            if(arr[i]==arr[j]) { printf("Duplicate found: %d\n", arr[i]); return 0; }

    printf("No duplicates found.\n");
    return 0;
}
