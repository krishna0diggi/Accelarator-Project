import { Injectable } from '@nestjs/common';

export interface PaginationMeta {
  totalData: number;
  from: number;
  to: number;
}

@Injectable()
export class PaginatorService {
  async paginatorCount(
    pageIndex: number,
    pageSize: number,
    totalCount: number,
    currentData: any[]
  ): Promise<PaginationMeta> {
    const offset = pageSize * (pageIndex - 1);
    return {
      totalData: totalCount,
      from: totalCount !== 0 ? offset + 1 : 0,
      to: offset + currentData.length,
    };
  }
}
