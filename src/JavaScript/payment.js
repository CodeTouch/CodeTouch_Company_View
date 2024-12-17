// payment.js
const { IMP } = window;

export function initializeIMP() {
  if (IMP) {
    IMP.init("imp22383085"); // 결제 대행사에서 발급받은 아이디
  } else {
    console.error("아임포트 SDK 로드 실패");
  }
}

export function certification({
  onSuccess,
  onFailure,
}){
  if(!IMP){
    console.log("아임포트 SDK 로드 실패");
    return;
  }

  IMP.certification(
    {},
    (rep) => {
      if(rep.success){
        if (onSuccess) onSuccess(rep);
      } else {
        if (onFailure) onFailure(rep);
      }
    }
  )
}

export function requestPayment({
  pg = "html5_inicis",
  payMethod = "card",
  merchantUid = `ORD-${new Date().getTime()}`,
  name,
  amount,
  buyerEmail,
  buyerName,
  buyerTel,
  onSuccess,
  onFailure,
}) {
  if (!IMP) {
    console.error("아임포트 SDK 로드 실패");
    return;
  }

  IMP.request_pay(
    {
      pg,
      pay_method: payMethod,
      merchant_uid: merchantUid,
      name,
      amount,
      buyer_email: buyerEmail,
      buyer_name: buyerName,
      buyer_tel: buyerTel,
    },
    (response) => {
      if (response.success) {
        if (onSuccess) onSuccess(response);
      } else {
        if (onFailure) onFailure(response);
      }
    }
  );
}