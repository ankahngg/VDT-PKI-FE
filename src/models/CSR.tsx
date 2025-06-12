export type CSR = {
    common_name: string;
    organization: string;
    organization_unit: string;
    country: string;
    state: string;
    locality: string;
    email: string;
    public_key_pem: string;
    csr_pem: string;
}

import forge from "node-forge";

export function parseCSR(pem: string): CSR {
    const csr = forge.pki.certificationRequestFromPem(pem);
  
    const getAttr = (name: string) => {
      const attr = csr.subject.attributes.find((a) => a.name === name);
      return attr ? attr.value : "";
    };
    const publicKeyPem = forge.pki.publicKeyToPem(csr.publicKey);
  
    return {
      common_name: getAttr("commonName") || "Không có",
      organization: getAttr("organizationName") || "Không có",
      organization_unit: getAttr("organizationalUnitName") || "Không có",
      country: getAttr("countryName") || "Không có",
      state: getAttr("stateOrProvinceName") || "Không có",
      locality: getAttr("localityName") || "Không có",
      email: getAttr("emailAddress") || "Không có",
      public_key_pem: publicKeyPem,
      csr_pem: pem,
    };
  }

export function parseAndVerifyCSR(pem: string) {
    try {
      const csr = forge.pki.certificationRequestFromPem(pem);
  
      if (!csr.verify()) {
        console.error("CSR signature is invalid!");
        return false;
      }
  
      console.log("CSR is valid. Subject:", csr.subject.attributes);
      return true;
    } catch (err) {
      console.error("CSR is malformed or not parseable:", err);
      return false;
    }
  }
