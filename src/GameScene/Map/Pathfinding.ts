export class Pathfinding {
    private grid: number[][];

    constructor(grid: number[][]) {
        this.grid = grid;
    }

    bfs(start: { x: number, y: number }, goal: { x: number, y: number }): { x: number, y: number }[] | null {
        const directions = [
            { x: 0, y: 1 }, // Down
            { x: 1, y: 0 }, // Right
            { x: 0, y: -1 }, // Up
            { x: -1, y: 0 }, // Left
        ];

        const queue: { x: number, y: number, path: { x: number, y: number }[] }[] = [];
        const visited = Array.from({ length: this.grid.length }, () => Array(this.grid[0].length).fill(false));
        queue.push({ x: start.x, y: start.y, path: [{ x: start.x, y: start.y }] });

        while (queue.length > 0) {
            const { x, y, path } = queue.shift()!;

            if (x === goal.x && y === goal.y) {
                return path; 
            }

            for (const dir of directions) {
                const nx = x + dir.x;
                const ny = y + dir.y;

                // Kiểm tra nếu điểm tiếp theo hợp lệ và chưa được thăm
                if (nx >= 0 && nx < this.grid[0].length && ny >= 0 && ny < this.grid.length && this.grid[ny][nx] === 1 && !visited[ny][nx]) {
                    visited[ny][nx] = true;
                    queue.push({ x: nx, y: ny, path: [...path, { x: nx, y: ny }] });
                }
            }
        }

        return null; 
    }

    private heuristic(a: { x: number, y: number }, b: { x: number, y: number }): number {
        // Heuristic sử dụng khoảng cách Manhattan
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    astar(start: { x: number, y: number }, goal: { x: number, y: number }): { x: number, y: number }[] | null {
        const directions = [
            { x: 0, y: 1 },  // Down
            { x: 1, y: 0 },  // Right
            { x: 0, y: -1 }, // Up
            { x: -1, y: 0 }, // Left
        ];

        const openList: { x: number, y: number, cost: number, path: { x: number, y: number }[] }[] = [];
        const visited = Array.from({ length: this.grid.length }, () => Array(this.grid[0].length).fill(false));

        openList.push({ x: start.x, y: start.y, cost: 0, path: [{ x: start.x, y: start.y }] });

        while (openList.length > 0) {
            // Sắp xếp để lấy phần tử có tổng chi phí thấp nhất (g + h)
            openList.sort((a, b) => (a.cost + this.heuristic(a, goal)) - (b.cost + this.heuristic(b, goal)));
            const { x, y, cost, path } = openList.shift()!;

            // Nếu đã đến đích, trả về đường đi
            if (x === goal.x && y === goal.y) {
                return path;
            }

            // Đánh dấu vị trí hiện tại là đã thăm
            visited[y][x] = true;

            // Duyệt qua các hướng
            for (const dir of directions) {
                const nx = x + dir.x;
                const ny = y + dir.y;

                // Kiểm tra nếu điểm tiếp theo hợp lệ, có thể đi được và chưa được thăm
                if (nx >= 0 && nx < this.grid[0].length && ny >= 0 && ny < this.grid.length && this.grid[ny][nx] === 1 && !visited[ny][nx]) {
                    const newCost = cost + 1; // Mỗi bước có chi phí là 1 (g)
                    openList.push({
                        x: nx,
                        y: ny,
                        cost: newCost,
                        path: [...path, { x: nx, y: ny }],
                    });
                }
            }
        }

        // Không tìm thấy đường đi
        return null;
    }
}