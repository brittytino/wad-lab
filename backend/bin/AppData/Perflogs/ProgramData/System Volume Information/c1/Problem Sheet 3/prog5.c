#include <stdio.h>
int main() {
    int n,i,j,dup=0;
    printf("Enter number of elements: ");
    scanf("%d",&n);
    int arr[n];

    printf("Enter elements: ");
    for(i=0;i<n;i++) scanf("%d",&arr[i]);

    for(i=0;i<n;i++) {
        for(j=i+1;j<n;j++) {
            if(arr[i]==arr[j]) { dup=1; break; }
        }
        if(dup) break;
    }
    if(dup) printf("Duplicates found.\n");
    else printf("No duplicates.\n");
    return 0;
}
