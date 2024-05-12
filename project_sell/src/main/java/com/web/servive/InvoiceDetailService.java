package com.web.servive;

import com.web.dto.response.InvoiceDetailResponse;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public interface InvoiceDetailService {

    public List<InvoiceDetailResponse> findByInvoice(Long idInvoice);
    public List<InvoiceDetailResponse> filterByDay(Date startDate, Date endDate);
}
