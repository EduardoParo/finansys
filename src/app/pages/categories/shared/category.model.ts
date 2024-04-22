import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Category extends BaseResourceModel {
  constructor() {
    super();
  }

  static resJsonToCategory(res: any): Category {
    return Object.assign(new Category(), res);
  }
}
