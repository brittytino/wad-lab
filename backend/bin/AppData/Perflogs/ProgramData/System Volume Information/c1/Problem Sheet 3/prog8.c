#include <stdio.h>
int main() {
    int n,key,i,j,temp;
    printf("Enter number of elements: ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter elements: ");
    for(i=0;i<n;i++) scanf("%d",&arr[i]);
    printf("Enter key: ");
    scanf("%d",&key);

    for(i=0;i<key;i++) {
        temp=arr[0];
        for(j=0;j<n-1;j++) arr[j]=arr[j+1];
        arr[n-1]=temp;
    }
    printf("Rotated array: ");
    for(i=0;i<n;i++) printf("%d ",arr[i]);
    return 0;
}
