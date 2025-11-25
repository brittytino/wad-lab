# graph_traversal.py

# Build graph as adjacency list (dict: vertex -> list of neighbors)
def build_graph():
    n = int(input("Enter number of vertices: "))
    m = int(input("Enter number of edges: "))

    graph = {}
    i = 0
    while i < n:
        graph[i] = []
        i += 1

    print("Enter edges (u v) for an undirected graph, vertices in [0..", n-1, "]")
    e = 0
    while e < m:
        parts = input().split()
        if len(parts) != 2:
            print("Enter exactly two integers u v")
            continue
        u = int(parts[0])
        v = int(parts[1])
        if u < 0 or u >= n or v < 0 or v >= n:
            print("Invalid vertex, try again.")
            continue
        graph[u].append(v)
        graph[v].append(u)
        e += 1

    return graph, n

def bfs(graph, start):
    visited = set()
    queue = []

    visited.add(start)
    queue.append(start)

    print("BFS order:", end=" ")
    while queue:
        v = queue.pop(0)  # front of queue
        print(v, end=" ")
        for neigh in graph[v]:
            if neigh not in visited:
                visited.add(neigh)
                queue.append(neigh)
    print()

def dfs_util(graph, v, visited):
    visited.add(v)
    print(v, end=" ")
    for neigh in graph[v]:
        if neigh not in visited:
            dfs_util(graph, neigh, visited)

def dfs(graph, start):
    visited = set()
    print("DFS order:", end=" ")
    dfs_util(graph, start, visited)
    print()

graph, n = build_graph()

while True:
    print("\n--- Graph Menu ---")
    print("1. BFS")
    print("2. DFS")
    print("0. Exit")
    ch = input("Choice: ").strip()

    if ch == '1':
        s = int(input("Start vertex for BFS: "))
        if s < 0 or s >= n:
            print("Invalid start vertex.")
        else:
            bfs(graph, s)
    elif ch == '2':
        s = int(input("Start vertex for DFS: "))
        if s < 0 or s >= n:
            print("Invalid start vertex.")
        else:
            dfs(graph, s)
    elif ch == '0':
        break
    else:
        print("Invalid choice")
