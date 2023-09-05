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
      categoryOrderHints: unknown
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
      searchKeywords: unknown
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
      categoryOrderHints: unknown
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
      searchKeywords: unknown
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
  attributes: {
    name: string
    value: number[]
  }[]
  assets: []
}

export type Variants = {
  id: number
  key: string
  attributes: {
    name: string
    value: number[]
  }[]
  prices: {
    id: string
    key: string
    discounted?: {
      discount: {
        typeID: string
        id: string
      }
      value: {
        type: string
        currencyCode: string
        centAmount: number
        fractionDigits: number
      }
    }
    value: {
      centAmount: number
      currencyCode: string
      fractionDigits: number
      type: string
    }
  }[]
}
