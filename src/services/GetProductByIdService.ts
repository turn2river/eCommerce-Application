/* eslint-disable @typescript-eslint/ban-types */
import axios from 'axios'

export class GetProductByIdService {
  public async getProductById(token: string, id: string): Promise<Product> {
    const url = `https://api.europe-west1.gcp.commercetools.com/parfumerie/products/${id}`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const response = await axios.get(url, { headers })
    // console.log(response.data.masterData.current)
    return response.data
  }
}

export type Product = {
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  createdBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  productType: {
    typeId: string
    id: string
  }
  masterData: {
    current: {
      name: {
        'en-US': string
        'ru': string
      }
      description: {
        'en-US': string
        'ru': string
      }
      categories: {
        typeId: string
        id: string
      }[]
      categoryOrderHints: {}
      slug: {
        'en-US': string
        'ru': string
      }
      metaTitle: {
        'en-US': string
        'ru': string
      }
      metaDescription: {
        'en-US': string
        'ru': string
      }
      masterVariant: MasterVariant
      variants: Variants[]
      searchKeywords: {}
    }
    staged: {
      name: {
        'en-US': string
        'ru': string
      }
      description: {
        'en-US': string
        'ru': string
      }
      categories: {
        typeId: string
        id: string
      }[]
      categoryOrderHints: {}
      slug: {
        'en-US': string
        'ru': string
      }
      metaTitle: {
        'en-US': string
        'ru': string
      }
      metaDescription: {
        'en-US': string
        'ru': string
      }
      masterVariant: MasterVariant
      variants: []
      searchKeywords: {}
    }
    published: boolean
    hasStagedChanges: boolean
  }
  key: string
  priceMode: string
  lastVariantId: number
  id: string
}

export type MasterVariant = {
  id: number
  prices: {
    id: string
    value: {
      type: string
      currencyCode: string
      centAmount: number
      fractionDigits: number
    }
    key: string
  }[]
  images: {
    url: string
    dimensions: {
      w: number
      h: number
    }
  }[]
  attributes: []
  assets: []
}

export type Variants = {
  id: number
  key: string
  prices: {
    id: string
    key: string
    value: {
      centAmount: number
      currencyCode: string
      fractionDigits: number
      type: string
    }
  }[]
}
