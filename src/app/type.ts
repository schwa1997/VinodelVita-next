export type GeometryType = {
    type: string; // 描述几何类型的字段
    coordinates: PolygonCoordinates[][];
};
export type PolygonCoordinates = [number, number];
export type ReportType = {
    id: string;
    title: string;
    description: string;
    disease: string;
    area: AreaType;
    vineyard: VineyardType;
    status: number;
    updatedAt: string;
    createdAt: string;
    company: CompanyType;
    deletedAt: string;
};
export type VineyardType = {
    id: string;
    name: string;
    winetype: string;
    areanumber: string;
    yearofplanning: string;
    area: string;
    execution: string;
    interventions: InterventionType[];
    geometry: GeometryType;
    reports: ReportType[];
};
export type AreaType = {
    vineyards: VineyardType[];
    id: string;
    name: string;
    code: string;
    geometry: GeometryType;
};

export type CompanyType = {
    id: string;
    companyName: string;
    password: string;
    email: string;
    phone: string;
};

export type InterventionType = {
    id: string;
    name: string;
    code: string;
    type: string;
    description: string;
};
