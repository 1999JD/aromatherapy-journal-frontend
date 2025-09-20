export type ApiTagDto = {
    id: number;
    name: string;
    color: string;
};

export type ApiPersonalTagDto = {
    id: number;
    name: string;
    color: string;
};

export type ApiEssentialOilDto = {
    id: number;
    name: string;
    englishName: string;
    scientificName: string;
    note: string;
    tags: ApiTagDto[];
    personalTags: ApiPersonalTagDto[];
};

export type ApiNewUserDto = {
    username: string;
    email: string;
    token: string;
};

export type ApiRegisterDto = ApiNewUserDto;

export type ApiPagedResponse<T> = {
    items: T[];
    totalCount: number;
};

export type Tag = {
    id: number;
    name: string;
    color: string;
};

export type PersonalTag = {
    id: number;
    name: string;
    color: string;
};

export type EssentialOil = {
    id: number;
    name: string;
    englishName: string;
    scientificName: string;
    note: string;
    tags: Tag[];
    personalTags: PersonalTag[];
};